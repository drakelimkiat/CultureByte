from instagram.client import InstagramAPI
import sys
import pandas as pd
import datetime


client_id = '906b636c8bfd484e9d4a1ec9b2031267' 
client_secret = '3aee6f06599e45bab085ba46a59212db'
api = InstagramAPI(client_id=client_id, client_secret=client_secret)

# data = api.media_search(count=100, lat=lat, lng=lng)
# popular_media = api.media_popular(count=20)

# for media in popular_media:
#     print media.images['standard_resolution'].url

api.list_subscriptions()
# api.delete_subscriptions(id=342342)

api.create_subscription(object='user', aspect='media', callback_url='http://bd6d0671.ngrok.io/api/subscribe_callback')