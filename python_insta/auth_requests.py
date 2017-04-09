from instagram.client import InstagramAPI
import sys
import pandas as pd
import datetime


CLIENT_ID = '906b636c8bfd484e9d4a1ec9b2031267'  
CLIENT_SECRET = '3aee6f06599e45bab085ba46a59212db'
REDIRECT_URI = "http://culturebyte.me/"

#access_token (culturebyte)=4986970129.906b636.9292e038f2cf458399b44460cbc76466
#access_token (celesteanglm)=208874470.906b636.4cb19127c2c44adc9d54b1b252eeac9a
#access_token (culturebyte_test)=5021743569.1677ed0.3402b0c66bbc42f5ab6400e0bed761cd

auth_url = "https://api.instagram.com/oauth/authorize/?client_id=" + CLIENT_ID + "&redirect_uri=" + REDIRECT_URI + "&response_type=token"

# E.g. of redirect received from Instagram:
# http://culturebyte.me/#access_token=4986970129.906b636.9292e038f2cf458399b44460cbc76466

# scope=basic

# https://api.instagram.com/v1/users/self/media/recent/?access_token=208874470.906b636.4cb19127c2c44adc9d54b1b252eeac9a

# def login(self):
#     log_string = 'Trying to login as %s...\n' % (self.user_login)
#     # self.write_log(log_string)
#     self.login_post = {
#         'username': self.user_login,
#         'password': self.user_password
#     }
#     self.s.headers.update({
#         'Accept-Encoding': 'gzip, deflate',
#         'Accept-Language': self.accept_language,
#         'Connection': 'keep-alive',
#         'Content-Length': '0',
#         'Host': 'www.instagram.com',
#         'Origin': 'https://www.instagram.com',
#         'Referer': 'https://www.instagram.com/',
#         'User-Agent': self.user_agent,
#         'X-Instagram-AJAX': '1',
#         'X-Requested-With': 'XMLHttpRequest'
#     })
#     r = self.s.get(self.url)
#     self.s.headers.update({'X-CSRFToken': r.cookies['csrftoken']})
#     time.sleep(5 * random.random())
#     login = self.s.post(
#         self.url_login, data=self.login_post, allow_redirects=True)
#     self.s.headers.update({'X-CSRFToken': login.cookies['csrftoken']})
#     self.csrftoken = login.cookies['csrftoken']
#     time.sleep(5 * random.random())

#     if login.status_code == 200:
#         r = self.s.get('https://www.instagram.com/')
#         finder = r.text.find(self.user_login)
#         if finder != -1:
#             ui = UserInfo()
#             self.user_id = ui.get_user_id_by_login(self.user_login)
#             self.login_status = True
#             log_string = '%s login success!' % (self.user_login)
#             self.write_log(log_string)
#         else:
#             self.login_status = False
#             self.write_log('Login error! Check your login data!')
#     else:
#         self.write_log('Login error! Connection error!')