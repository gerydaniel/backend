<?php
namespace AppBundle\Services;

use Firebase\JWT\JWT;
use Doctrine\ORM\EntityManager;
/*use AppBundle\Doctrine\UserManager;*/

class JwtAuth{
	public $manager;
	public $key;


	public function  __construct (EntityManager  $manager)
	{
	$this->manager =$manager;
	$this->key = 'jholasollaclave12334535';
	}





public function signup($email,$password,$getHash = null)
{
	$user = $this->manager->getRepository('BackendBundle:User')->findOneBy(array(
		"email"=>$email,
		"password"=>$password
	));
	$signup=false;
	if(is_object($user)){
		$signup=true;

	}
	if($signup==true){
//GENERAR TOKEN JWT
		$token =array(
			"sub"=> $user ->getId(),
			"email"=>$user->getEmail(),
			"name"=>$user->getName(),
			"surname"=> $user->getSurname(),
			"iat"=>time(),
			"exp"=>time()+(5*60)
					);
		//genrar el token
		$jwt =JWT::encode($token,$this->key,'HS256');
		$decoded = JWT::decode($jwt,$this->key,array('HS256'));
		if($getHash == null){
			$data=$jwt;

		}else
		{
			$data=$decoded;
		}

		}else{
		$data= array (
			'status'=> 'error',
			'data'=> 'error login!!!'
			);

	}

	return $data;
}
	public function checkToken($jwt,$getIdentity = false){
		$auth = false;

		//decodifcar el oken
		try{
			$decoded = JWT::decode($jwt,$this->key,array('HS256'));
		}catch(\UnexpectedValueExcpetion $e){
			$auth =false;
		}catch(\DomainException $e){
			$auth =false;
		}
		if(isset ($decoded)&&is_object ($decoded) && isset($decoded->sub)){
			$auth = true;

		}else
		{
			$auth =false;
		}
		if( $getIdentity == false){
			return $auth;
		}
		else{
			return $decoded;
		}
	
	}
}