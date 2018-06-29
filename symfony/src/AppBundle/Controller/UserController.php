<?php
namespace  AppBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Services\Helpers;
use Symfony\Component\Validator\Constraints as Assert;
use BackendBundle\Entity\User;


class UserController extends Controller{

	public function newAction(Request $request)
	{
		$helpers = $this->get(Helpers::class);

		$json = $request ->get("json", null);
		$params = json_decode($json);

			$data = array(
					'status' => 'error',
					'code' => 400,
					'msg'=>'user no creado'


			);
			if($json!=null)
			{
				$createdAt = new \Datetime("now");
				$role = 'user';

				$email=(isset($params->email))? $params -> email :null;
				$name=(isset($params->name))? $params -> name :null;
				$surname=(isset($params->surname))? $params -> surname :null;
				$password=(isset($params->password))? $params -> password :null;
				//validacion del emial
				$emailConstraint= new Assert\Email();
				$emailConstraint->message='Email no valido!!!';
				$validate_email = $this->get("validator")->validate($email,$emailConstraint);
				if($email != null && count ($validate_email)==0 && $password != null&& $name != null && $surname != null){
						//asiganacion d seteer para el objeto
						$user = new User();
						$user ->setCreatedAt($createdAt);
						$user ->setrole($role);
						$user ->setemail($email);
						$user ->setname($name);
						$user ->setsurname($surname);
						//persistencia en el orm

						$em = $this-> getDoctrine()->getManager();

						//validacion si el usuario existe

						$isset_user =$em -> getRepository('BackendBundle:User')->findBy(array(
							"email"=> $email

						));

						if (count($isset_user) == 0)
							{
								$em ->persist($user);
								$em-> flush();

								$data = array(
										'status' => 'succes',
										'code' => 200,
										'msg'=>'user  creado',
										'user'=> $user);

							}else{

								$data = array(
										'status' => 'error',
										'code' => 400,
										'msg'=>'user no creado porque ya existe');

								}
					}

						

				}
			

			return $helpers->json($data);
	}
}
