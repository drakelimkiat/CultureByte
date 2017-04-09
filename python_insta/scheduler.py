import schedule
import time
import insta_miner

def job(interval):
    insta_miner.collect_instagram_data(interval)


def run_scheduler(interval):
	schedule.every(interval).minutes.do(job, interval)
	while True:
		print('waiting...')
		schedule.run_pending()
		time.sleep(1)


# ---------------------------------------------------------------------------------------
# Main method
# ---------------------------------------------------------------------------------------
if __name__ == '__main__':
    run_scheduler(0.5)
