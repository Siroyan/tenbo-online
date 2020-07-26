#!/usr/bin/env python3

from aws_cdk import (
    core,
    aws_s3 as s3,
    aws_s3_deployment as s3_deploy
)
import os

from tenbo_online.tenbo_online_stack import TenboOnlineStack


app = core.App()
TenboOnlineStack(
    app, "tenbo-online",
    env = {
        "region": os.environ["CDK_DEFAULT_REGION"],
        "account": os.environ["CDK_DEFAULT_ACCOUNT"]
    }
)

app.synth()
