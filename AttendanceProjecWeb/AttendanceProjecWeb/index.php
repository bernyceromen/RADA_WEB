<?php

//adding DBOperation file
require_once '../includes/DBOperation.php';

//response array
$response = array();
        //check record for login
     
            if(!empty($_POST['Username']) && !empty($_POST['Passwords']))
            {
                $db = new DBOperation();
                if($db->loginCheck($_POST['Username'], $_POST['Passwords']))
                {
                    $response['error'] = false;
                    $response['message'] = 'Logged in Succesfully';
                }else{
                    $response['error'] = true;
                    $response['message'] = 'Username or Password is incorrect';
                }
            }
            else{
                $response['error'] = true;
                $response['message'] = 'Required parameter missing';
            }
            

        break;

        default:
            $response['error'] = true; 
            $response['message'] = 'No Operation to perform';

    }
}
else
{
    $response['error'] = true; 
    $response['message'] = 'Invalid request';
}

//displaying data on json
echo json_encode($response);
?>