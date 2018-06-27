<?php
namespace AppBundle\Services;

use Firebase\JWT\JWT;
use Doctrine\ORM\EntityManager;
/*use AppBundle\Doctrine\UserManager;*/

class JwtAuth{
	public $manager;


	public function  __construct (EntityManager  $manager)
	{
	$this->manager =$manager;
	}





public function signup($email,$password)
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
		$data= array (
			'status'=> 'succes',
			'user'=>$user
			//'user'=> $user
			);

	}else{
		$data= array (
			'status'=> 'error',
			'data'=> 'error login!!!'
			);

	}
	//return $email." ".$password;
	return $data;
}

}