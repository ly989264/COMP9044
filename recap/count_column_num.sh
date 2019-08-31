#!/bin/sh

head -n 1 diary.txt | tr '|' '\n' | wc -l
