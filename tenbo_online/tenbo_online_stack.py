from aws_cdk import (
    core,
    aws_s3 as s3,
    aws_s3_deployment as s3_deploy
)
import os

class TenboOnlineStack(core.Stack):

    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        bucket = s3.Bucket(
            self, "tenbo-online.io",
            website_index_document = "index.html",
            public_read_access = True,
            removal_policy = core.RemovalPolicy.DESTROY
        )

        s3_deploy.BucketDeployment(
            self, "BucketDeployment",
            destination_bucket = bucket,
            sources = [s3_deploy.Source.asset("./contents")],
            retain_on_delete = False,
        )
