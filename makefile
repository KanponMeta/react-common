IMAGE_NAME = zhongxing-product-router-screen
TAG ?= latest
POST = 9000

docker-build:
	docker build -t $(IMAGE_NAME):$(TAG) -f Dockerfile .

docker-rmi:
	docker rmi -f $(IMAGE_NAME):$(TAG)

docker-push:
	docker push $(IMAGE_NAME):$(TAG)

docker-save:
	docker save -o $(IMAGE_NAME)_$(TAG).tar $(IMAGE_NAME):$(TAG)

docker-load:
	docker load -i $(IMAGE_NAME)_$(TAG).tar

docker-run:
	docker run -d -p ${POST}:80 $(IMAGE_NAME):$(TAG)

docker-deploy:docker-rmi docker-build docker-run


.PHONY: docker-build docker-push docker-save docker-load docker-run docker-rmi clean