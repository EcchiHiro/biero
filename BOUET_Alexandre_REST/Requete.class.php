<?php
/**
 * Class Requete
 * Gère les requêtes HTTP (Router)
 * 
 * @author Jonathan Martel
 * @version 1.0
 * @update 2016-03-03
 * @license MIT
 * @see http://www.lornajane.net/posts/2012/building-a-restful-php-server-understanding-the-request
 */

class Requete 
{
	public $url_elements;
    public $verbe;
    public $parametres;
	private $_db;
	
    public function __construct() {
        $this->_db = MonSQL::getInstance();
        
        $this->verbe = $_SERVER['REQUEST_METHOD'];
		$_GET['url'] = trim($_GET['url'], '\/');
        $this->url_elements = explode('/', $_GET['url']);
				
		$this->traitementParametre();
        
	}
	/**
	 * Décode les paramètres de la requête
	 * @access private
	 */
	private function traitementParametre() {
        $parametres = array();

        // Traitement du queryString (?cle=valeur&cle2=valeur...)
        if (isset($_SERVER['QUERY_STRING'])) {
            parse_str($_SERVER['QUERY_STRING'], $parametres);
			unset($parametres['url']);	// Retire l'url du query string
        }

        $donnees_brut = file_get_contents("php://input");	// Récupère les données
		
        $content_type = false;
        if(isset($_SERVER['CONTENT_TYPE'])) {
            $content_type = $_SERVER['CONTENT_TYPE'];
        }
        switch($content_type) 
        {
            case "application/json":
                $donnees = json_decode($donnees_brut);
                if($donnees) 
                {
                    foreach($donnees as $nom => $valeur) 	// Place les données dans un tableau selon leur clé
                    {
						$parametres[$nom] = $this->aseptiserParametre($valeur);
                    }
                }
                break;
			default:
				$this->erreur(400);
				break;
        }
        $this->parametres = $parametres;
    }
	
	/**
	 * Permet de nettoyer les valeurs passées en paramètre
	 * @param String $valeur Valeur à filtrer
	 * @return String La valeur filtrer.
	 * @access private
	 */
	private function aseptiserParametre($valeur)
	{
		$valeur = $this->_db->real_escape_string($valeur);
		$valeur = htmlspecialchars($valeur);
		return $valeur;
	}
	
	/**
	 * Génère l'erreur 400
	 * @access private
	 */	
	public function erreur($code)
	{
		if(isset($_GET['debug']))
		{
			var_dump($_SERVER);
		}
		
		http_response_code($code);
		
		
		
	}
}
?>