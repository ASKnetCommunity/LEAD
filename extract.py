#!/usr/bin/env python3

# SPDX-FileCopyrightText: 2022 Robin Vobruba <hoijui.quaero@gmail.com>
#
# SPDX-License-Identifier: AGPL-3.0-or-later

from os import listdir
from os.path import isfile, join
import yaml
import csv
import re

def main():
    prof_path = "./_profiles"
    prof_files = [f for f in listdir(prof_path) if isfile(join(prof_path, f))]
    parsed_profiles = []
    for pf in prof_files:
        print('')
        print(pf)
        yaml_content = ["file: %s\n" % pf]
        with open(join(prof_path, pf)) as f:
            in_yaml = False
            for line in f:
                if line.strip() == "---":
                    if in_yaml:
                        break
                    else:
                        in_yaml = True
                elif in_yaml:
                    yaml_content.append(line)

        parsed_yaml = yaml.safe_load(''.join(yaml_content))
        if 'skills' in parsed_yaml:
            for skl in parsed_yaml['skills']:
                name_clean = re.sub(r"[^a-zA-Z0-9]", '', skl['name'])
                parsed_yaml['skill_' + name_clean] = skl['qualification']
                parsed_yaml['skills'].remove(skl)
        parsed_profiles.append(parsed_yaml)
    
    # gather all property names
    # ... manual
    #prop_names = set(["country","facebook","file","github","hub","image","instagram","languages","layout","linkedin","mail","mastodon","phone","region","skill_CommunityModeration","skill_MediaArt","skill_OrganizationalDevelopment","skill_Sustainability","skill_WebSoftware","skills","telegram","title","twitter","website","whatsapp","wikifab"])
    # ... all/automatic
    prop_names = set()
    for prfl in parsed_profiles:
        for key in prfl.keys():
            prop_names.add(key)
    prop_names = list(prop_names)
    prop_names.sort()

    profs_csv = 'profiles.csv'
    with open(profs_csv, 'w') as f_profs_csv:
        profs_writer = csv.writer(f_profs_csv)
        # header
        profs_writer.writerow(prop_names)
        for prfl in parsed_profiles:
            row = []
            for prop_name in prop_names:
                val = ''
                if prop_name in prfl:
                    val = prfl[prop_name]
                row.append(val)
            profs_writer.writerow(row)

main()
