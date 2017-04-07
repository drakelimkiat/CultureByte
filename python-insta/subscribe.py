from flask import Flask, jsonify, request
import traceback
import json
import requests
from datetime import datetime, timedelta
# from pprint import pprint


app = Flask(__name__)


@app.route('/')
def hello():
    return "Hello World!"


# ---------------------------------------------------------------------------------------
# OPS: test get request
# curl http://127.0.0.1:5000/test?user_id=2024
# ---------------------------------------------------------------------------------------
@app.route('/test', methods=['GET'])
def test():
    try:
        print("welcome!")
        return jsonify({'message': 'welcome!'})

    except Exception:
        traceback.print_exc()
        return jsonify({'message': 'ERROR!'})


# ---------------------------------------------------------------------------------------
# OPS: subscription callback
# curl http://127.0.0.1:5000/api/subscribe_callback

# sample data:
# e.g. https://api.instagram.com/v1/users/self/media/recent/
# ?access_token=208874470.906b636.4cb19127c2c44adc9d54b1b252eeac9a
# ---------------------------------------------------------------------------------------

@app.route('/api/get_recent_posts', methods=['GET'])
def get_recent_posts():
    ENDPOINT_URL = 'https://api.instagram.com/v1/users/self/media/recent/'
    try:
        print("get_recent_posts()")
        access_token = request.args['access_token']

        response = requests.get(ENDPOINT_URL,
                                params={'access_token': access_token})

        # return response.text
        utc_now = datetime.utcnow()
        utc_start = utc_now - timedelta(hours=1)
        start_timestamp = (utc_start - datetime(1970, 1, 1)).total_seconds()
        end_timestamp = (utc_now - datetime(1970, 1, 1)).total_seconds()

        res = json.loads(response.text)

        results = []

        if 'data' in res:
            print(type(res))
            if res['data']:
                for post in res['data']:
                    # create dictionary for each post
                    try:
                        # check if time range is within the last hr - if not,
                        # skip this post
                        if start_timestamp < int(post['created_time']) <= end_timestamp:
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
            return jsonify({'results': results})

    except Exception:
        traceback.print_exc()
        return jsonify({'message': 'ERROR!'})

# ---------------------------------------------------------------------------------------
# OPS: subscription callback (NOT IN USE)
# curl http://127.0.0.1:5000/api/subscribe_callback
# ---------------------------------------------------------------------------------------

# no longer needed

@app.route('/api/subscribe_callback', methods=['GET', 'POST'])
def subscribe_callback():
    try:
        print("subscribe_callback()")
        if request.method == 'GET':
            if 'hub.challenge' in request.args:
                hub_challenge = request.args['hub.challenge']
                return hub_challenge
            else:
                # jsonify({'message': 'subscription authentication worked!'})
                return json.dumps(request.args)

        elif request.method == 'POST':
            req_json = request.get_json(force=True)
            return json.dumps(req_json)

    except Exception:
        traceback.print_exc()
        return jsonify({'message': 'ERROR!'})


if __name__ == '__main__':
    app.run()
