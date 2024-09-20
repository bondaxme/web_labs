from telegram import Update, ReplyKeyboardMarkup
from telegram.constants import ChatAction
from telegram.ext import Application, MessageHandler, CommandHandler, ContextTypes, filters
import google.generativeai as genai

TOKENTG = "7522552840:AAEwpCc3wV-9hJmED9oPJ3Y1C6LvnR6_j9s"
API_KEY = "AIzaSyA885_ZxwNgKhsB5j8ZjCSgEwrv2zHGzD8"

genai.configure(api_key=API_KEY)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        ['Студент', 'ІТ Технології'],
        ['Контакти', 'Prompt Gemini']
    ]
    reply_markup = ReplyKeyboardMarkup(keyboard, one_time_keyboard=True, resize_keyboard=True)
    await update.message.reply_text('Оберіть опцію:', reply_markup=reply_markup)

async def reply(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text = update.message.text

    if text == 'Студент':
        await update.message.reply_text('ПІБ: Бондаренко М.В., Група: ІП-13')
    elif text == 'ІТ Технології':
        await update.message.reply_text('ІТ Технології: JavaScript, Vue.js')
    elif text == 'Контакти':
        await update.message.reply_text('Контакти: телефон: +380123456789, email: lab3@gmail.com')
    elif text == 'Prompt Gemini':
        await update.message.reply_text('Введіть ваше запитання для Gemini:')
        context.user_data['awaiting_prompt'] = True
    else:
        if context.user_data.get('awaiting_prompt', False):
            await context.bot.send_chat_action(chat_id=update.effective_chat.id, action=ChatAction.TYPING)
            try:
                model = genai.GenerativeModel("gemini-1.5-flash")
                reply = model.generate_content(text)
                reply_text = reply.text 
            except Exception as e:
                reply_text = f"Виникла помилка: {str(e)}"

            await update.message.reply_text(reply_text)
            context.user_data['awaiting_prompt'] = False
        else:
            await update.message.reply_text('Не розпізнано команду. Використовуйте меню.')

def main():
    app = Application.builder().token(TOKENTG).build()

    app.add_handler(CommandHandler('start', start))

    echo_handler = MessageHandler(filters.TEXT & (~filters.COMMAND), reply)
    app.add_handler(echo_handler)

    app.run_polling()

if __name__ == '__main__':
    main()