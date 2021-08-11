${jsonencode(
  [for container in containers: {
    name = container.name,
    image = container.image,
    cpu = 10,
    memory = 512,
    essential = true,
    secrets = [for env, secret in (container.secrets != null ? container.secrets : {}) : {
      name = env
      valueFrom = "arn:aws:ssm:${region}:${account_id}:parameter${secret}"
    }]

    environment = [for env, value in (container.environment != null ? container.environment : {}) : {
      name = env,
      value = value
    }]

    essential  = container.essential != null ? container.essential : false
    entrypoint = container.entrypoint
    command    = container.command

    portMappings = [for port in (container.ports != null ? container.ports : []): {
      containerPort = port,
      hostPort = port
    }]

    logConfiguration = {
        logDriver = "awslogs",
        options = {
            awslogs-group = "/ecs/${service_name}/${container.name}"
            awslogs-region = region
            awslogs-stream-prefix = "ecs-logs"
        }
    }

    dependsOn = [for dependency in (container.dependsOn != null ? container.dependsOn : []): {
      containerName = dependency.name
      condition = dependency.condition
    }]
  }]
)}
