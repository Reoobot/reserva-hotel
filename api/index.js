import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserModel from './models/User.js'
import PlaceModel from './models/Place.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import imageDownloader from 'image-downloader'
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import multer from 'multer';
import fs from 'fs'
import BookingModel from './models/Booking.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



dotenv.config();
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'hshhjkahjsuuwjkjasuguahs'
const allowedOrigins = [
    'http://localhost:5173', // Tu servidor local de desarrollo
    'https://reserva-page-v-6-vcsm.vercel.app', // Tu dominio en Vercel sin la barra final
  ];


app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(cors({
    credentials: true,
    origin: allowedOrigins,
  }));

mongoose.connect(process.env.MONGO_URL);


function getUserDataFromToken(req) {
    return new Promise((resolve,reject)=>{
        jwt.verify(req.cookies.token,jwtSecret,{},async(err,userData)=>{
            if(err) throw err;
           resolve(userData)
        });
    });
}


app.get('/test', (req,res) =>{
    res.json('tes ok')
})

app.post('/register', async (req,res)=>{
    const{name,email,password} = req.body;
    try {

        const userDoc = await UserModel.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt),
        });
        res.json(userDoc)
    } catch (e) {
        res.status(422).json(e);
    }
});

app.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    const userDoc = await UserModel.findOne({email})
    console.log('BBDD',userDoc);
    if (userDoc) {
        const passOk = bcrypt.compareSync(password,userDoc.password);
        // res.json('found');
        if (passOk) {
            jwt.sign({
                email:userDoc.email,
                id:userDoc._id,}
                ,jwtSecret, {}, (err,token) =>{
                if(err) throw err;  
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json('pass not ok');
        }
        } else {
        res.json('not found');
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        try {
            jwt.verify(token, jwtSecret, {}, async (err, userData) => {
                if (err) {
                    console.error('Error al verificar el token:', err);
                    res.status(401).json({ message: 'Token inválido' });
                } else {
                    const userDoc = await UserModel.findById(userData.id);
                    res.json(userDoc);
                }
            });
        } catch (error) {
            console.error('Error inesperado al verificar el token:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    } else {
        res.json(null);
    }
});
    
app.post('/logout', (req,res) => {
    res.cookie('token', '').json(true);
})

console.log('imagen',{__dirname});
app.post('/upload-by-link', async (req,res) => {
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url:link,
        dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName)
});


const photosMiddleware = multer({dest:'uploads'});
app.post('/upload',photosMiddleware.array('photos', 100), (req,res) => {
    const uploadedFiles = [];
    for(let i = 0; i < req.files.length;i++){
        const {path,originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path,newPath); 
        uploadedFiles.push(newPath.replace('uploads/',''));
    }
    res.json(uploadedFiles)
    // console.log('imagen cargada',uploadedFiles);
})

app.post('/places', (req,res) => {
    const {token} = req.cookies;
    const {
        title,address,addedPhotos,description,
        perks,extraInfo,checkIn,checkOut,maxGuests,price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err,userData) => {
        if(err) throw err;
        const placeDoc = await PlaceModel.create({
            owner: userData.id,price,
            title,address,photos:addedPhotos,description,
            perks,extraInfo,checkIn,checkOut,maxGuests,
        });
        res.json(placeDoc);
    });
})

app.get('/user-places', (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token válido' });
    }

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err || !userData) {
            return res.status(401).json({ message: 'Token inválido o no válido' });
        }

        const { id } = userData;
        console.log('Obteniendo lugares del usuario con ID:', id);

        try {
            const places = await PlaceModel.find({ owner: id });
            res.json(places);
        } catch (error) {
            console.error('Error al buscar lugares:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    });
});

app.get('/places/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const place = await PlaceModel.findById(id);
        if (!place) {
            return res.status(404).json({ message: 'Lugar no encontrado' });
        }
        res.json(place);
    } catch (error) {
        console.error('Error al buscar el lugar:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

app.put('/places', async (req,res)=>{
    const {token} = req.cookies;
    const {
        id,title,address,addedPhotos,description,
        perks,extraInfo,checkIn,checkOut,maxGuests,price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err,userData) => {
        if(err) throw err;
        const placeDoc = await PlaceModel.findById(id)
        if(userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title,address,photos:addedPhotos,description,
                perks,extraInfo,checkIn,checkOut,maxGuests,price,
            })
            placeDoc.save();
            res.json('ok')
        }
    })
})

//ojo com places
app.get('/places',async (req,res)=>{
    res.json( await PlaceModel.find());
})

app.post('/bookings', async (req,res) => {
    const userData = await getUserDataFromToken(req);
    const {
        place,checkIn,checkOut,numberOfGuests,name,phone,price,
    } = req.body;
    await BookingModel.create({
        place,checkIn,checkOut,numberOfGuests,name,phone,price,
        user:userData.id,
    }).then((doc)=> {
        res.json(doc)
    }).catch((err)=>{
        throw err;
    })

});

   

app.get('/bookings', async (req,res)=> {
   const userData = await getUserDataFromToken(req);
   res.json(await BookingModel.find({user:userData.id}));
})

app.listen(4001);


