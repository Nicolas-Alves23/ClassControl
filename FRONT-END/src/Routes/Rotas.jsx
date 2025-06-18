import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from '../Pages/Login';
import { Home } from "../Pages/Home";
import { Layout } from "../Pages/Layout";

import { Teacher_subjects } from "../Pages/Teachers/Teacher_subjects";
import { Teacher_Envirouments } from "../Pages/Teachers/Teacher_Envirouments";

import { User_Edit } from "../Pages/manager/User_Edit";
import { User_Register } from "../Pages/manager/User_Register";
import { User_Manager } from "../Pages/manager/User_Manager";

import {Classroom_Register} from "../Pages/manager/Classroom_Register";
import {Classroom_Manager} from "../Pages/manager/Classroom_Manager";
import {Classroom_edit} from "../Pages/manager/Classroom_edit";

import { Subjects_Manager} from "../Pages/manager/Subjects_Manager";
import { Subject_Edit } from "../Pages/manager/Subject_Edit";
import { Subject_Register } from "../Pages/manager/Subject_Register";

import { Enviroument_Manager } from "../Pages/manager/Enviroment_Manager";


export function Rotas() {
    
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path='/disciplinas' element={<Teacher_subjects/>} />
                <Route path='/Reservas' element={<Teacher_Envirouments/>} />

                <Route path='/gestor/disciplina' element={<Subjects_Manager/>}/>
                <Route path='/gestor/disciplina/editar/:id' element={<Subject_Edit/>}/>
                <Route path='/gestor/disciplina/criar/' element={<Subject_Register/>}/>

                <Route path='/gestor/sala' element={<Classroom_Manager/>}/>
                <Route path="/gestor/sala/editar/:id" element={<Classroom_edit/>}/>
                <Route path="/gestor/sala/register/" element={<Classroom_Register/>}/>

                <Route path='/gestor/usuario' element={<User_Manager/>}/>
                <Route path="/gestor/usuario/register/" element={<User_Register/>}/>
                <Route path="/gestor/usuario/editar/:id" element={<User_Edit/>}/>

                <Route path='/gestor/reserva' element={<Enviroument_Manager/>}/>
            </Route>
        </Routes>
    );
}
