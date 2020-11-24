from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib, ssl
from setting import sipemaEmail

def sendEmail(reciever, subject, msg):
  sender = sipemaEmail["email"]

  password = sipemaEmail["password"]

  context = ssl.create_default_context()

  server = smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context)

  server.login(sender, password)

  message = MIMEMultipart()

  message["Subject"] = subject

  message["From"] = sender

  message["To"] = reciever

  body = MIMEText(msg, "plain")

  message.attach(body)

  server.sendmail(sender, reciever, message.as_string())