# ParkFinder Navigator

## GitHub CI/CD Pipeline Setup Guide

This guide will help you configure your GitHub repository for the CI/CD pipeline to run successfully. Follow these steps to ensure proper setup and deployment.

## Prerequisites

- GitHub account with admin access to the repository
- Docker Hub account
- Access to deployment environment (if applicable)

## Repository Settings

1. Enable GitHub Actions:
   - Navigate to `Settings` > `Actions` > `General`
   - Select `Allow all actions and reusable workflows`
   - Under `Workflow permissions`, select `Read and write permissions`

2. Configure Branch Protection:
   - Go to `Settings` > `Branches`
   - Click `Add branch protection rule`
   - Set the following:
     - Branch name pattern: `main`
     - Check `Require pull request reviews before merging`
     - Check `Require status checks to pass before merging`
     - Check `Require branches to be up to date before merging`

## Required Secrets

Set up the following secrets in `Settings` > `Secrets and variables` > `Actions`:

1. Docker Hub Credentials:
   - `DOCKERHUB_USERNAME`: Your Docker Hub username
   - `DOCKERHUB_TOKEN`: Your Docker Hub access token (not your password)

2. Deployment Credentials (if applicable):
   - `DEPLOY_SSH_KEY`: SSH private key for deployment
   - `DEPLOY_HOST`: Deployment server hostname/IP
   - `DEPLOY_USERNAME`: SSH username for deployment

## Environment Variables

Set up environment variables in `Settings` > `Secrets and variables` > `Actions` > `Variables`:

- `APP_NAME`: Your application name
- `DOCKER_REPO`: Your Docker Hub repository name

## Verifying Setup

1. Check Action Permissions:
   - Verify workflow permissions are set correctly
   - Ensure all required secrets are properly configured

2. Test Pipeline:
   - Make a small change to the repository
   - Create a pull request
   - Verify that GitHub Actions are triggered
   - Check if all pipeline stages complete successfully

## Troubleshooting

If the pipeline fails:

1. Check the Action logs for specific error messages
2. Verify all secrets are correctly set
3. Ensure Docker Hub credentials have sufficient permissions
4. Verify SSH key permissions and server accessibility
5. Check if all required dependencies are properly configured

## Security Best Practices

- Never commit secrets directly to the repository
- Regularly rotate your Docker Hub and SSH keys
- Review GitHub Action logs to ensure no sensitive information is exposed
- Use the minimum required permissions for service accounts and tokens

## Support

If you encounter any issues:

1. Review the troubleshooting section above
2. Check the GitHub Actions documentation
3. Contact the repository maintainers

## License

This project is licensed under the MIT License - see the LICENSE file for details.