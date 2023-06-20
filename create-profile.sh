# author: Dut Andrew Kulang dutandrew78[at]gmail.com

#!/bin/bash

#image link
IMAGELINK='assets/images/profiles/'
profiles_home_path='_profiles/'

echo $'Enter full eg. Dut Andrew Kulang: '
read F_NAME

# removing extra unnecessary spaces in the string.
F_NAME=$(echo "$F_NAME" | tr -s ' ')

# name separeted by dashes to be create image and markdown files 'Dut-Andrew-Kulang/' 'Dut-Andrew-Kulang.md'
D_NAME="${F_NAME//' '/'-'}"

# Image directory
IMAGE_DIR=$IMAGELINK$D_NAME

# the path to a profile among other profiles
path_to_profile=$profiles_home_path$D_NAME.md

if [ ! -f "$path_to_profile" ]
    then
    read -p $'Hub/organization\n' HUB
    HUB=$(echo "$HUB" | tr -s ' ')

    read -p $'In which country are you active in?\n' COUNTRY
    COUNTRY=$(echo "$COUNTRY" | tr -s ' ')


    echo -e $"In region/district/state of $COUNTRY are you operate in?"
    read REGION
    REGION=$(echo "$REGION" | tr -s ' ')

    read -p $'E-mail\n' EMAIL
    EMAIL=$(echo "$EMAIL" | tr -s ' ')


    read -p $'Your phone number e.g. +256782....\n' PHONE_NUMBER
    PHONE_NUMBER=$(echo "$PHONE_NUMBER" | tr -s ' ')
    
    read -p $'Whatsapp Number e.g +2119..\n' WHATSAPP_NUMBER
    WHATSAPP_NUMBER=$(echo "$WHATSAPP_NUMBER" | tr -s ' ')

    read -p $'Website URL e.g https://lead.asknet.community\n' WEBSITE_URL

    read -p $'Telegram username e.g Username\n' TELEGRAM
    TELEGRAM=$(echo "$TELEGRAM" | tr -s ' ')

    read -p $'GitHub Username e.g Username\n' GITHUB
    GITHUB=$(echo "$GITHUB" | tr -s ' ')

    read -p $'URL to LinkedIn profile Username\n' LINKEDIN
    LINKEDIN=$(echo "$LINKEDIN" | tr -s ' ')

    read -p $'Your twitter Username\n' TWITTER
    TWITTER=$(echo "$TWITTER" | tr -s ' ')

    read -p $'Your Facebook Username\n' FACEBOOK
    FACEBOOK=$(echo "$FACEBOOK" | tr -s ' ')

    read -p $'Your instagram Username\n' INSTAGRAM
    INSTAGRAM=$(echo "$INSTAGRAM" | tr -s ' ')

    read -p $'Mastodon profile link\n' MASTODON
    MASTODON=$(echo "$MASTODON" | tr -s ' ')

    read -p $'Your wikifab Username\n' WIKIFAB
    WIKIFAB=$(echo "$WIKIFAB" | tr -s ' ')

    read -p $'Other\n' OTHER
    OTHER=$(echo "$OTHER" | tr -s ' ')

    read -p $'Profile bio\n' BIO
    BIO=$(echo "$BIO" | tr -s ' ')

    #check if the expert already has an image directory

    if [ -d "$IMAGE_DIR" ]
    then
        echo "$F_NAME already has a image folder at $IMAGE_DIR"
    else
        mkdir -p $IMAGE_DIR
        echo "Image folder created for $F_NAME at $IMAGE_DIR"
    fi


    if [ ! -d "$profiles_home_path" ]
    then
        #profile path
        mkdir -p _profiles    
    fi

echo "---
layout: profile
title: \"$F_NAME\"
image: \"$IMAGELINK$D_NAME/$D_NAME\"
country: $COUNTRY
region: $REGION
hub: $HUB
languages:
mail: $EMAIL
phone: \"$PHONE_NUMBER\"
whatsapp: \"$WHATSAPP_NUMBER\"
website: $WEBSITE_URL
telegram: $TELEGRAM
github: $GITHUB
linkedin: $LINKEDIN
twitter: $TWITTER
facebook: $FACEBOOK
instagram: $INSTAGRAM
mastodon: $MASTODON
wikifab: $WIKIFAB
skills:
  - {
  }
---
$BIO" | tee > $path_to_profile
    else
        echo "$F_NAME already has a profile file at $path_to_profile."
fi
