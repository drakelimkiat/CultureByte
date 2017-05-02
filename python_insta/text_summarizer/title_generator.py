from text_summarizer import summarizer_class
import traceback


# ---------------------------------------------------------------------------------------
# Given the text of a post, generate a title (which is a sentence selected from the text)
# ---------------------------------------------------------------------------------------

def get_title(text):
	try:
		fs = summarizer_class.FrequencySummarizer()
		result = fs.summarize(text, 1)
		return result[0]

	except:
		traceback.print_exc()
		return ''