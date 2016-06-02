<?php
/**
 * Class BiereControleur
 * Controleur de la ressource Biere
 * 
 * @author Jonathan Martel
 * @version 1.0
 * @update 2016-03-31
 * @license MIT
 */

  
class BiereControleur 
{
	/**
	 * Méthode qui gère les action en GET
	 * @param Requete $oReq
	 * @return Mixed Données retournées
	 */
	public function getAction(Requete $oReq)
	{
		$res = array();
		
		if(isset($oReq->url_elements[1]) && is_numeric($oReq->url_elements[1]))	// Route /biere/{id}/...
		{
            $id_biere = (int)$oReq->url_elements[1];
            
            if(isset($oReq->url_elements[2])) 	// Route /biere/{id}/[commentaire, note]
            {
                switch($oReq->url_elements[2]) 
                {
                	case 'commentaire':
                    	$res = $this->getCommentaire($id_biere);
                    	break;
					case 'note':
                    	$res = $this->getNote($id_biere);
                    	break;
                	default:
                    	$oReq->erreur(400);
                    	break;
            	}
			} 
            else // Route /biere/{id}/
            {
                
                $res = $this->getBiere($id_biere);
				
            }
        } 
        else // Route /biere/
        {
        	$res = $this->getListeBiere();
			
        }
			
        return $res;	
	}
	
	/**
	 * Méthode qui gère les action en POST
	 * @param Requete $oReq
	 * @return Mixed Données retournées
	 */
	public function postAction(Requete $oReq)	// Modification
	{
		if(!$this->valideAuthentification())
        {
            $oReq->erreur(401);
            exit;     
        }
        
        if(isset($oReq->url_elements[1]) && is_numeric($oReq->url_elements[1]))	// Route /biere/{id}/...
        {
            $id_biere = (int)$oReq->url_elements[1];
                                    
            // recuperation des données entrées dans l'input
            $data = file_get_contents("php://input");
            // transformation du json en tableau associatif
            $data = json_decode($data, true);


            $res = $this->postBiere($id_biere, $data);
			
        }
        else 
        {
            $oReq->erreur(400);
        }
	
		return $res;
		
	}
	
	/**
	 * Méthode qui gère les action en PUT
	 * @param Requete $oReq
	 * @return Mixed Données retournées
	 */
	public function putAction(Requete $oReq)		//ajout ou modification
	{
         
		if(!$this->valideAuthentification())
        {
            $oReq->erreur(401);
            exit;
            
        }
        else 
        {
                $res = array();
            
                // recuperation des données entrées dans l'input
                $data = file_get_contents("php://input");
                // transformation du json en tableau associatif
                $data = json_decode($data, true);

                if(isset($oReq->url_elements[1]) && is_numeric($oReq->url_elements[1]))	// Route /biere/{id}/...
                {
                    $id_biere = (int)$oReq->url_elements[1];

                    if(isset($oReq->url_elements[2])) 	// Route /biere/{id}/[commentaire, note]
                    {
                        switch($oReq->url_elements[2]) 
                        {
                            case 'commentaire':
                                $res = $this->putCommentaire($id_biere, $data);
                                break;
                            case 'note':
                                $res = $this->putNote($id_biere, $data);
                                break;
                            default:
                                $oReq->erreur(400);
                                break;
                        }
                    } 
                } 
                else // Route /biere/
                {
                    $res = $this->putBiere($data);
                }

                if($res == 0) 
                {
                   $oReq->erreur(400);
                    
                } 
                else 
                {
                 return $res;    
                }	
            }
        
        
        
	}
	
	/**
	 * Méthode qui gère les action en DELETE
	 * @param Requete $oReq
	 * @return Mixed Données retournées
	 */
	public function deleteAction($oReq)
	{
        
		if(!$this->valideAuthentification())
        {
            $oReq->erreur(401);
            exit;     
        }
        
        if(isset($oReq->url_elements[1]) && is_numeric($oReq->url_elements[1]))	// Route /biere/{id}/...
        {
            $id_biere = (int)$oReq->url_elements[1];

            $res = $this->deleteBiere($id_biere);
			
        }
        else 
        {
            $oReq->erreur(400);
        }
	
		return $res;
		
	}
	
	
	
	/**
	 * Retourne les informations de la bière $id_biere
	 * @param int $id_biere Identifiant de la bière
	 * @return Array Les informations de la bière
	 * @access private
	 */	
	private function getBiere($id_biere)
	{
		$oBiere = new Biere();
		$aBiere = $oBiere->getBiere($id_biere);
		
		return $aBiere;
	}
	
	/**
	 * Retourne les informations des bières de la db	 
	 * @return Array Les informations sur toutes les bières
	 * @access private
	 */	
	private function getListeBiere()
	{
		$oBiere = new Biere();
		$aBiere = $oBiere->getListe();
		
		return $aBiere;
	}
	
	/**
	 * Retourne les commentaires de la bière $id_biere
	 * @param int $id_biere Identifiant de la bière
	 * @return Array Les commentaires de la bière
	 * @access private
	 */	
	private function getCommentaire($id_biere)
	{
		$oCommentaire = new Commentaire();
		$aCommentaire= $oCommentaire->getListe($id_biere);
		
		return $aCommentaire;
	}

	/**
	 * Retourne la note moyenne et le nombre de note de la bière $id_biere
	 * @param int $id_biere Identifiant de la bière
	 * @return Array Les commentaires de la bière
	 * @access private
	 */	
	private function getNote($id_biere)
	{
		
		$oNote = new Note();
		$moyenne = $oNote->getMoyenne($id_biere);
		$nombre = $oNote->getNombre($id_biere);
        
        //On ajoute les retour des fonctions dans un arrayahhh
        $aNoteEtMoyenne = array('id_biere' => $id_biere, 'note' => $moyenne, 'nombre' => $nombre);
        // Que l'on transforme en json
        json_encode($aNoteEtMoyenne);
                
		return $aNoteEtMoyenne;
	}	

    /**
	 * Ajoute une biere dans la base de donnée 
	 * @param array $data tableau des données
	 * @return id_biere
	 * @access private
	 */	
	private function putBiere($data)
	{
		
		$oBiere = new Biere();
		$aBiere = $oBiere->ajouterBiere($data);

		return $aBiere;
	}    
    
    /**
	 * Ajoute une biere dans la base de donnée 
	 * @param array $data tableau des données
	 * @param int $id_biere 
     * @return data sous forme Json
	 * @access private
	 */	
	private function putCommentaire($id_biere, $data)
	{
		extract($data);
        
		$oCommentaire = new Commentaire();
        $oUsager = new Usager();
        $idUsager = $oUsager->getUsagerParCourriel($courriel);
        
        // Si l'usager n'est pas reconnu, $res = 0 donc erreur 400
        if($idUsager['id_usager'] == 0) 
        {
             $res = 0;
        } 
        else 
        {
            $oCommentaire = new Commentaire();
            $res = $oCommentaire->ajouterCommentaire($idUsager["id_usager"], $id_biere, $commentaire);
            
        }

		return $res;
	}   
    
    /**
	 * Ajoute une note sur une biere dans la base de donnée 
	 * @param array $data tableau des données
	 * @param int $id_biere
     * @return data sous forme Json
	 * @access private
	 */	
	private function putNote($id_biere, $data)
	{
		extract($data);
        
		$oNote = new Note();
        $oUsager = new Usager();
        $idUsager = $oUsager->getUsagerParCourriel($courriel);
        
		$aNote = $oNote->ajouterNote($idUsager["id_usager"], $id_biere, $note);
        
		return $aNote;
	}    
    
    
    /**
	 * Supprime une biere dans la base de donnée 
	 * @param int $id_biere numero de la biere
     * @return boolean
	 * @access private
	 */	
	private function deleteBiere($id_biere)
	{
	
        $oBiere= new Biere();
        $aBiere = $oBiere->effacerBiere($id_biere);
        
		return $aBiere;
	}
    
     /**
	 * Modifie une biere dans la base de donnée 
	 * @param int $id_biere numero de la biere
	 * @param array $data 
     * @return boolean
	 * @access private
	 */	
	private function postBiere($id_biere, $data)
	{
	
        $oBiere= new Biere();
        $aBiere = $oBiere->modifierBiere($id_biere, $data);
        
		return $aBiere;
	}
	
	/**
	 * Valide les données d'authentification du service web
	 * @return Boolean Si l'authentification est valide ou non
	 * @access private
	 */	
	private function valideAuthentification()
    {
        
        $access = false;
        $headers = apache_request_headers();
		
        if (isset($headers['Authorization'])) 
        {
            if(isset($_SERVER['PHP_AUTH_PW']) && isset($_SERVER['PHP_AUTH_USER']))
            {
                if($_SERVER['PHP_AUTH_PW'] == 'biero' && $_SERVER['PHP_AUTH_USER'] == 'biero')// Ne devrait pas être dans le code...
				{
					$access = true;
				}
            }
        }
        return $access;
    }
		
}
