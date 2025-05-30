<?php 
class Router{
    public function cargarVista($vista){
        switch($vista){
            case "Index":
                include_once __DIR__ ."/../../Frontend/views/index.php";
            break;
            case "contact":
                include_once __DIR__ ."/../../Frontend/views/contact.php";
            break;
            case "about":
                include_once __DIR__ ."/../../Frontend/views/about.php";
            break;
            case "service":
                include_once __DIR__ ."/../../Frontend/views/service.php";
            break;
        }
    }
    public function validarGet($variable){
        if(empty($variable)){
            echo"<script> window.history.back();</script>";
        }else{
            return $variable;
        }
    }
}