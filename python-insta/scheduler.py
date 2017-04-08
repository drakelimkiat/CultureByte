import schedule
import time
import insta_miner

def job():
    insta_miner.collect_instagram_data()

schedule.every(15).minutes.do(job)

while True:
    schedule.run_pending()
    time.sleep(1)