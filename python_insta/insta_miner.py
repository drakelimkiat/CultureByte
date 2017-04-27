import traceback
import pymongo
from pprint import pprint
import time
import requests
import json
from text_summarizer import title_generator
import datetime
import Config


# ---------------------------------------------------------------------------------------
# Get all valida instagram accounts among CultureByte's users
# ---------------------------------------------------------------------------------------

def get_valid_accounts(host, port):
    # will replace localhost/port number later with config file later
    # result = subprocess.run(['meteor mongo -U'], stdout=subprocess.PIPE, shell=True)
    # result_string = str(result.stdout)
    try:
        users = []
        client = pymongo.MongoClient(host, port)
        db = client['CultureByte']
        coll = db['users']
        results = coll.find({}, no_cursor_timeout=True)
        if results:
            for user in results:
                try:
                    user_info = {}
                    if 'profile' in user:
                        if 'instagram' in user['profile']:
                            acct = user['profile']['instagram']
                            user_info['user_id'] = user['_id']

                            if 'username' in user:
                            	user_info['username'] = user['username']
                            else:
                            	user_info['username'] = ''

                            user_info['insta_username'] = acct['username']
                            user_info['insta_access_token'] = acct['accessToken']
                            users.append(user_info)
                except:
                    traceback.print_exc()
        return users

    except:
        traceback.print_exc()
        return []


# ---------------------------------------------------------------------------------------
# Given user's instagram access token, collect their latest posts
# ---------------------------------------------------------------------------------------

def get_user_posts(session_post_ids, user_id, access_token, interval, start_timestamp, end_timestamp):
    ENDPOINT_URL = 'https://api.instagram.com/v1/users/self/media/recent/'
    try:
        response = requests.get(ENDPOINT_URL,
                                params={'access_token': access_token})

        res = json.loads(response.text)

        user_results = {
            'access_token': access_token,
            'user_id': user_id
        }

        results = []

        if 'data' in res:
            # print(type(res))
            if res['data']:
                for post in res['data']:
                    # create dictionary for each post
                    try:
                        # check if this post is in the list of pending post ids
                        post_id = post['id']
                        if post_id not in session_post_ids:
                            # check if posted time was in the interval and culturebyte hashtag is in the post
                            if start_timestamp <= int(post['created_time']) <= end_timestamp and 'culturebyte' in post['tags']:
                                result = {}
                                result['picture'] = post['images']['standard_resolution']['url']
                                result['location'] = post['location']
                                result['caption'] = post['caption']['text']
                                result['created_time'] = int(post['created_time'])
                                session_post_ids.append(post_id)
                                results.append(result)

                    except Exception:
                        traceback.print_exc()
                        pass
            
            user_results['results'] = results
        return user_results

    except Exception:
        traceback.print_exc()
        return user_results


# ---------------------------------------------------------------------------------------
# Filter out unique posts from the user's recent posts
# Currently not in use
# ---------------------------------------------------------------------------------------

def filter_posts_by_uniqueness(posts):
    # will add on an algorithm to filter by uniqueness
    # if time permits
    return posts

# ---------------------------------------------------------------------------------------
# Store all instagram posts into mongo
# ---------------------------------------------------------------------------------------

def posts_mongo_store(data, accts, host, port):
    try:
        pprint(data)
        for user_data in data:
            try:
                access_token = user_data['access_token']
                user_id = user_data['user_id']
                for acct in accts:
                    if acct['insta_access_token'] == access_token and acct['user_id'] == user_id:
                        create_posts(acct, user_data['results'], host, port)

            except:
                traceback.print_exc()

    except:
        traceback.print_exc()


# ---------------------------------------------------------------------------------------
# For each user, store all instagram posts into mongo
# ---------------------------------------------------------------------------------------

def create_posts(acct, data, host, port):
	for dat in data:
		post = {}
		post['body'] = dat['caption']
		post['title'] = title_generator.get_title(dat['caption'])
		post['pictureUrl'] = dat['picture']
		post['author'] = acct['user_id']
		post['username'] = acct['username']
		post['liked_count'] = 0
		post['createdAt'] = datetime.datetime.utcnow()
        post['_id'] = str(ObjectId())
		# print
		# pprint(post)

		# insert to mongo
		client = pymongo.MongoClient(host, port)
		db = client['CultureByte']
		coll = db['posts']
		coll.insert(post)
		# print('POSTED!')


# ---------------------------------------------------------------------------------------
# Get all instagram posts from CultureByte's users in the last x minutes
# takes in interval size (i.e., x) in terms of minutes
# ---------------------------------------------------------------------------------------

def collect_instagram_data(interval, host="localhost", port=3001):
    config = Config.get_config()
    if config:
        try:
            mongo_keys = config['mongo']
            host = mongo_keys['host']
            port = mongo_keys['port']
        except:
            print('Mongo keys not found!')
            traceback.print_exc()
            host = "localhost"
            port = 3001

    end_timestamp = int(time.time())
    start_timestamp = end_timestamp - (interval * 60)

    data = []
    session_post_ids = []
    accts = get_valid_accounts(host, port)

    for acct in accts:
        try:
            posts = get_user_posts(session_post_ids, acct['user_id'], acct['insta_access_token'], interval, start_timestamp, end_timestamp)
            
            if posts['results']:
                unique_posts = filter_posts_by_uniqueness(posts)
                if unique_posts:
                    data.append(unique_posts)
        except:
            traceback.print_exc()

    posts_mongo_store(data, accts, host, port)
