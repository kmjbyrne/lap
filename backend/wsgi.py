__author__ = 'Keith Byrne'

import sys
import logging

logger = logging.getLogger(__name__)

from app import create_app

if len(sys.argv) > 1:
    application = create_app(sys.argv[1])
else:
    application = create_app('RELEASE')

if __name__ == '__main__':
    logger.info('Running BNS with {} configuration.'.format(application.config['ENVIRONMENT']))
    application.run()