import json
import hashlib
import random
import requests
import time
import re

APP_ID = '20250518002360182'
APP_KEY = 'mirkgOoeMgVTVDMHaKAH'
API_URL = 'https://fanyi-api.baidu.com/api/trans/vip/translate'

VAR_PATTERN = re.compile(r'{{.*?}}')
TAG_PATTERN = re.compile(r'<.*?>')

def baidu_translate(query, from_lang='en', to_lang='zh'):
    salt = str(random.randint(32768, 65536))
    sign = APP_ID + query + salt + APP_KEY
    sign = hashlib.md5(sign.encode()).hexdigest()
    params = {
        'q': query,
        'from': from_lang,
        'to': to_lang,
        'appid': APP_ID,
        'salt': salt,
        'sign': sign
    }
    try:
        response = requests.get(API_URL, params=params)
        result = response.json()
        if 'trans_result' in result:
            return result['trans_result'][0]['dst']
        else:
            print('翻译失败:', result)
            return query
    except Exception as e:
        print('请求异常:', e)
        return query

def smart_translate(text):
    vars = VAR_PATTERN.findall(text)
    tags = TAG_PATTERN.findall(text)
    temp = text
    for i, v in enumerate(vars):
        temp = temp.replace(v, f'[[VAR{i}]]')
    for i, t in enumerate(tags):
        temp = temp.replace(t, f'[[TAG{i}]]')
    translated = baidu_translate(temp)
    for i, v in enumerate(vars):
        translated = translated.replace(f'[[VAR{i}]]', v)
    for i, t in enumerate(tags):
        translated = translated.replace(f'[[TAG{i}]]', t)
    return translated

def translate_json_file(src_path, dest_path):
    with open(src_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    zh_data = {}
    for k, v in data.items():
        if isinstance(v, str):
            zh_data[k] = smart_translate(v)
            print(f'{k}: {zh_data[k]}')
            time.sleep(0.5)
        else:
            zh_data[k] = v
    with open(dest_path, 'w', encoding='utf-8') as f:
        json.dump(zh_data, f, ensure_ascii=False, indent=2)
    print(f'翻译完成，已保存到 {dest_path}')

if __name__ == '__main__':
    translate_json_file('public/locales/en/common.json', 'public/locales/zh/common.json')