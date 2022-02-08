#!/usr/bin/env python3


'''
Converts the YAML FrontMatter (meta-data) from the `_profile/*.md` files
into a single CSV table, and writes it to `profiles.csv`.
'''


# SPDX-FileCopyrightText: 2022 Robin Vobruba <hoijui.quaero@gmail.com>
#
# SPDX-License-Identifier: AGPL-3.0-or-later

from os import listdir
from os.path import isfile, join
import csv
import yaml

def parse_profiles():
    '''
    Parses the YAML FrontMatter (meta-data) from the `_profile/*.md` files.
    '''
    prof_path = "./_profiles"
    prof_files = [f for f in listdir(prof_path) if isfile(join(prof_path, f))]
    #prof_files = ["Timm-Wille.md"]
    parsed_profiles = []
    for path_f in prof_files:
        #print('')
        #print(path_f)
        yaml_content = ["file: %s\n" % path_f]
        with open(join(prof_path, path_f)) as f_prof:
            in_yaml = False
            for line in f_prof:
                if line.strip() == "---":
                    if in_yaml:
                        break
                    in_yaml = True
                elif in_yaml:
                    yaml_content.append(line)

        parsed_yaml = yaml.safe_load(''.join(yaml_content))
        if 'skills' in parsed_yaml:
            for skl in parsed_yaml['skills']:
                parsed_yaml['skill_' + str(skl['number'])] = skl['name']
            del parsed_yaml['skills']
        parsed_profiles.append(parsed_yaml)
    return parsed_profiles

def write_csv(parsed_profiles, prop_names):
    '''
    Writes the supplied columns of the supplied data to `profiles.csv`.
    '''
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

def main():
    '''
    Does everything (see module doc-string).
    '''
    parsed_profiles = parse_profiles()

    # gather all property names
    # ... manual
    prop_names = set(["title","country","region","hub","skill_1","skill_2","skill_3","skill_4"])
    # ... all/automatic
    #prop_names = set()
    # for prfl in parsed_profiles:
    #     for key in prfl.keys():
    #         prop_names.add(key)
    prop_names = list(prop_names)
    prop_names.sort()
    prop_names.insert(0, prop_names[7])
    prop_names.pop(8)

    write_csv(parsed_profiles, prop_names)

main()
