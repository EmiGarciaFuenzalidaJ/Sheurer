<?php
$receiving_email_address = 'Dana@scheurerpropiedades.com';

if (file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php')) {
  include($php_email_form);
} else {
  die('Unable to load the "PHP Email Form" Library!');
}

$contact = new PHP_Email_Form;
$contact->ajax = true;

// DESTINO
$contact->to = $receiving_email_address;

// IMPORTANTE: usar un email del dominio como remitente
$contact->from_name = 'Formulario Web - Scheurer';
$contact->from_email = 'no-reply@scheurerpropiedades.com'; // debe existir o al menos el dominio

// El mail del usuario se usa para responder
$contact->reply_to = $_POST['email'];

$contact->subject = $_POST['subject'];

// Mensajes
$contact->add_message($_POST['name'], 'Nombre');
$contact->add_message($_POST['email'], 'Email');
$contact->add_message($_POST['message'], 'Mensaje', 10);

echo $contact->send();
?>
