import traceback
import pymongo
from pprint import pprint
import time
import requests
import json


# ---------------------------------------------------------------------------------------
# Get all valida instagram accounts among CultureByte's users
# ---------------------------------------------------------------------------------------

def get_valid_accounts():
	# will replace localhost/port number later with config file later
	# result = subprocess.run(['meteor mongo -U'], stdout=subprocess.PIPE, shell=True)
	# result_string = str(result.stdout)
	try:
		users = []
		client = pymongo.MongoClient("localhost", 3001)
		db = client['meteor']
		coll = db['users']
		results = coll.find({}, no_cursor_timeout=True)
		for user in results:
			user_info = {}
			if 'instagram' in user:
				acct = user['instagram']
				user_info['username'] = acct['username']
				user_info['access_token'] = acct['access_token']
				users.append(user_info)
		return users

	except:
		traceback.print_exc()
		return []


# ---------------------------------------------------------------------------------------
# Given user's instagram access token, collect their latest posts
# ---------------------------------------------------------------------------------------

def get_user_posts(access_token, interval, start_timestamp, end_timestamp):
    ENDPOINT_URL = 'https://api.instagram.com/v1/users/self/media/recent/'
    try:
        response = requests.get(ENDPOINT_URL,
                                params={'access_token': access_token})

        res = json.loads(response.text)

        results = []

        if 'data' in res:
            # print(type(res))
            if res['data']:
                for post in res['data']:
                    # create dictionary for each post
                    try:
                        # check if time range is within the last hr - if not,
                        # skip this post
                        if start_timestamp <= int(post['created_time']) <= end_timestamp:
                            result = {}
                            result['created_time'] = post['created_time']
                            result['picture'] = post['images'][
                                'standard_resolution']['url']
                            result['location'] = post['location']
                            result['caption'] = post['caption']['text']
                            # pprint(result)
                            results.append(result)

                    except Exception:
                        traceback.print_exc()
                        pass
            return results

    except Exception:
        traceback.print_exc()
        return results


# ---------------------------------------------------------------------------------------
# Filter out unique posts from the user's recent posts
# Currently not in use
# ---------------------------------------------------------------------------------------

def filter_posts_by_uniqueness(posts):
	# will add on an algorithm to filter by uniqueness
	# if time permits
	return posts


# ---------------------------------------------------------------------------------------
# Get all instagram posts from CultureByte's users in the last x minutes
# takes in interval size (i.e., x) in terms of minutes
# ---------------------------------------------------------------------------------------

def collect_instagram_data(interval):
	end_timestamp = int(time.time())
	start_timestamp = end_timestamp - (interval*60)
	print
	print('start_timestamp:')
	print(start_timestamp)
	print
	print('end_timestamp:')
	print(end_timestamp)
	print
	data = []
	accts = get_valid_accounts()
	print('accts:')
	print(accts)
	for acct in accts:
		try:
			posts = get_user_posts(acct['access_token'], interval, start_timestamp, end_timestamp)
			if posts:
				unique_posts = filter_posts_by_uniqueness(posts)
				if unique_posts:
					data.extend(unique_posts)
		except:
			traceback.print_exc()
	print
	pprint(data)
	print