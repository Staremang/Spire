<?
/*
 * @param $filename - String (Путь до файла)
 * @param $date - Array (Данный для занесения)
 *
 */
function printData ($filename, $date) {
    if (file_exists($filename)) {
        $fp = fopen($filename, 'a');
    } else {
        $fp = fopen($filename, 'a');
        fwrite($fp, "\xEF\xBB\xBF");
    }
    fputcsv($fp, $date, ';');
    fclose($fp);
}


function getBody ($title, $body) {
    return '<html>
                <head>
                    <title>'.$title.'</title>
                    <style>
                        table {
                            border-collapse: collapse;
                            border-spacing: 0;
                        }
                        table, td {
                            border: solid 1px black;
                        }
                        td {
                            padding: 3px;
                        }
                        ul {
                            padding-left: 15px;
                            margin: 0;
                        }
                    </style>
                </head>
                <body>
                    '.$body.'
                </body>
            </html>';
}

if( isset($_POST['form-type']) ) {
    $to       = "staremang@ya.ru"; //Почта получателя (developer)
    $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
    $headers .= "From: Название <mail@mail.ru>\r\n"; //Наименование и почта отправителя


    
    if ($_POST['form-type'] == "contacts-form") {

        if ((isset($_POST['name']) && $_POST['name'] != "") && 
            (isset($_POST['tel']) && $_POST['tel'] != "") && 
            (isset($_POST['type']) && $_POST['type'] != "")) {

            $subject = 'Контактная форма';
            $message = '<table>
                            <tr>
                                <td>Имя:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['name']))).'</td>
                            </tr>
                            <tr>
                                <td>Телефон:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['tel']))).'</td>
                            </tr>
                            <tr>
                                <td>Услуга:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['type']))).'</td>
                            </tr>';

            if (isset($_POST['msg']) && $_POST['msg'] != "") {
                $message .= '
                            <tr>
                                <td>Сообщение:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['type']))).'</td>
                            </tr>';
            }

            $message .= '</table>';

            mail($to, $subject, getBody($subject, $message), $headers);
            // printData('form/stop.csv', array($_POST['name'], $_POST['tel']));

            echo json_encode(array('sended'=>true, 'type'=>$_POST['form-type'], 'message'=>''));
        } else {
            echo json_encode(array('sended'=>false, 'type'=>$_POST['form-type'], 'message'=>'Не все поля заполнены'));
        }

    } elseif ($_POST['form-type'] == "home-form") {

        if ((isset($_POST['email']) && $_POST['email'] != "")) {

            $subject = 'Почта';
            $message = '<table>
                            <tr>
                                <td>email:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['email']))).'</td>
                            </tr>
                        </table>';

            mail($to, $subject, getBody($subject, $message), $headers);
            // printData('form/stop.csv', array($_POST['name'], $_POST['tel']));

            echo json_encode(array('sended'=>true, 'type'=>$_POST['form-type'], 'message'=>''));
        } else {
            echo json_encode(array('sended'=>false, 'type'=>$_POST['form-type'], 'message'=>'Не все поля заполнены'));
        }

    } else {
        echo json_encode(array('sended'=>false,'message'=>'Не указан тип формы'));
    }
}



?>