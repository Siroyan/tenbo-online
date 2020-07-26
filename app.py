#!/usr/bin/env python3

from aws_cdk import core

from tenbo_online.tenbo_online_stack import TenboOnlineStack


app = core.App()
TenboOnlineStack(app, "tenbo-online")

app.synth()
