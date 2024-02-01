import React from 'react';
import { useState } from 'react';
import Footer from './../component/footer/footer';
import Header from './../component/header/header';
import { ToastContainer, toast } from 'react-toastify';
function LayoutMain(props) {
    return (
        <div>
            <Header isCard = {props.isCard} isFromSearch = {props.isFromSearch}></Header>
            <ToastContainer />
            {props.children}
            <Footer></Footer>
        </div>
    );
}

export default LayoutMain;