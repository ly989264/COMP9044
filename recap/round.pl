#!/usr/bin/perl -wp

s/(\d+\.\d+)/int($&+0.5)/eg;
