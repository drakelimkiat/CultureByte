import json, simplejson
import pprint
import sys, traceback


_CONFIG = None



# ---------------------------------------------------------------------------------------
#
# ---------------------------------------------------------------------------------------
def get_config():
   print("get_config()")
   _init()
   return globals()['_CONFIG']



# ---------------------------------------------------------------------------------------
#
# ---------------------------------------------------------------------------------------
def _init():
    try:

        if globals()['_CONFIG'] is None:
            import os
            print("Checking environment variable:  CULTUREBYTE_CONFIG")
            cb_config = os.environ.get('CULTUREBYTE_CONFIG')

            with open( cb_config ) as config_json:
                globals()['_CONFIG'] = simplejson.load( config_json )

    except Exception as e:
        traceback.print_exc()
        sys.exit(1)



# ---------------------------------------------------------------------------------------
# Initialize
# ---------------------------------------------------------------------------------------
_init()


# ---------------------------------------------------------------------------------------
#
# ---------------------------------------------------------------------------------------
if __name__ == '__main__':\
    get_config()