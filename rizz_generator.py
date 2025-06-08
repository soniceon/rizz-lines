import random

def generate_pickup_line():
    templates = [
        "Are you made of {element}? Because you're {pun}!",
        "Is your name {name}? Because {reason}!",
        "Are you a {profession}? Because {reason}!",
        "Is your name {name}? Because {reason}!"
    ]
    
    elements = {
        "copper and tellurium": "Cu-Te",
        "beryllium, gold, and titanium": "Be-Au-Ti-ful",
        "sugar": "so sweet"
    }
    
    names = {
        "Google": "you've got everything I've been searching for",
        "Wi-fi": "I'm really feeling a connection",
        "Cinderella": "I see that dress disappearing by midnight",
        "Ariel": "we were mermaid for each other",
        "Chapstick": "you're da balm",
        "Netflix": "I could watch you for hours",
        "Starbucks": "I like you a latte",
        "Pizza": "you're a slice of heaven",
        "Oxygen": "I can't live without you",
        "Google Maps": "you've got everything I've been searching for"
    }
    
    professions = {
        "magician": "whenever I look at you, everyone else disappears",
        "parking ticket": "you've got FINE written all over you",
        "time traveler": "I can see you in my future",
        "camera": "every time I look at you, I smile",
        "bank loan": "you've got my interest",
        "parking space": "you've got 'P' written all over you"
    }
    
    template = random.choice(templates)
    
    if "element" in template:
        element = random.choice(list(elements.keys()))
        return template.format(element=element, pun=elements[element])
    elif "name" in template:
        name = random.choice(list(names.keys()))
        return template.format(name=name, reason=names[name])
    else:
        profession = random.choice(list(professions.keys()))
        return template.format(profession=profession, reason=professions[profession])

def main():
    print("Welcome to the Rizz Line Generator!")
    print("Here's your pickup line:")
    print(generate_pickup_line())

if __name__ == "__main__":
    main() 