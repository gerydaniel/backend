<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use AppBundle\Services\Helpers;
use Symfony\Component\Validator\Constraints as Assert;
use AppBundle\Services\JwtAuth;
use AppBundle\Doctrine\UserManager;

class DefaultController extends Controller
{
   
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
        ]);
    }

    public function loginAction(Request $request)
    {

        $helpers=$this->get(Helpers::class);
        //recibir json por post
        $json=$request->get('json', null);
        //array a devolver por defecto
        $data=array(
              'status'=>'error',
               'data' => 'Send json via POST'
        );
        //si el json llega o no llega
        if ($json!=null){
            //ejecuta el login

            //json a un objeto de php conversion
            $params=json_decode($json);

            //verificacion de variables
            $email=(isset ($params->email)) ? $params->email :null;
            $password=(isset ($params->password))?$params->password :null;
            $getHash=(isset ($params->getHash))?$params->getHash :null;
            //validadion de emial
            $emailConstraint =new Assert\Email();
            $emailConstraint->message = "El correo no es valido";
            $validate_email = $this ->get ("validator") -> validate($email,$emailConstraint);
            
            //cifrar la contraseña
            $pwd =  hash ('sha256',$password);

            //comprarsi es valido
            if ($email != null && count($validate_email)==0 && $password !=null){

               $jwt_auth=$this->get(JwtAuth::class);

               if($getHash==null || $getHash == false){

                $signup= $jwt_auth -> signup($email, $pwd);

               }else
               {
                 $signup= $jwt_auth -> signup($email, $pwd,true);
               }
              
               return $this->json($signup);
       

            }else{

                 $data=array(
              'status'=>'error',
               'data' => 'email incorrecto');
            }



             
            }

        return $helpers->json($data);
    }
    public function pruebasAction(Request $request){

        $token= $request->get("authorization",null);
        $jwt_auth = $this->get(JwtAuth::class);
        $helpers = $this->get(Helpers::class);
        if($token && $jwt_auth-> checkToken($token) == true ){

             $em = $this->getDoctrine()-> getManager();
             $userRepo= $em ->getRepository('BackendBundle:User');
             $users=$userRepo->findAll();

            
             return  $helpers->json(array(
                    'status'=>'success',
                    'users'=> $users

             ));

        }else
        {
            return  $helpers->json(array(
                    'status'=>'error',
                    'users'=> 'Login Failed!!!'));

        }

       
        
   }


}
