<?php if(isset($_POST['name'])){$name=$_POST['name'];$phone=$_POST['phone'];$email=$_POST['email'];$subject=$_POST['subject'];$message=$_POST['message'];if($subject==""){$subject="Subscribe From Portfolio";}function clean_string($string){$bad=array("content-type","bcc:","to:","cc:","href");return str_replace($bad,"",$string);}$email_message.="Name: ".$name."\nEmail: ".clean_string($email)."\nMobile Number: ".$phone."\nSubject: ".$subject."\nMessage: ".$message;$headers='From: '.$email."\r\n".'Reply-To: '.$email."\r\n".'X-Mailer: PHP/'.phpversion();$result=@mail("rakibulhasan642004@gmail.com",$subject,$email_message,$headers);if($result){echo "ok";}else{echo "nope";}} ?>