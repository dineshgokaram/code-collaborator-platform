import docker
import traceback

def run_code_in_docker(code: str, language: str = "python"):
    """
    Runs a given code string in a secure, isolated Docker container.

    Args:
        code: The string of code to execute.
        language: The programming language (currently only "python" is supported).

    Returns:
        A dictionary containing the 'output' and 'error' strings.
    """
    # 1. Check if the language is supported
    if language != "python":
        return {"output": "", "error": "Unsupported language."}

    # 2. Connect to the Docker daemon on the host machine
    try:
        client = docker.from_env()
    except docker.errors.DockerException:
        return {"output": "", "error": "Docker daemon is not running or accessible."}

    # 3. Define the command to be executed inside the container
    command = ["python", "-c", code]

    # 4. Run the command in a temporary, sandboxed container
    try:
        # The client.containers.run() method creates, runs, and waits for a container
        container_output = client.containers.run(
            "python:3.9-slim",      # The Docker image to use as the environment
            command,                # The command to execute
            remove=True,            # Automatically delete the container when done
            mem_limit="128m",       # Security: Limit the container's memory usage
            network_disabled=True,  # Security: Disable all networking from the container
            stderr=True,            # Capture standard error stream
            stdout=True             # Capture standard output stream
        )
        
        # Decode the output from bytes to a UTF-8 string
        output = container_output.decode('utf-8')
        return {"output": output, "error": ""}

    except docker.errors.ContainerError as e:
        # This error is raised when the code *inside* the container exits with an error
        # (e.g., a Python SyntaxError). The error message is in e.stderr.
        error_output = e.stderr.decode('utf-8')
        return {"output": "", "error": error_output}

    except Exception:
        # This catches any other unexpected errors during the process
        # and returns the full traceback for debugging.
        return {"output": "", "error": traceback.format_exc()}