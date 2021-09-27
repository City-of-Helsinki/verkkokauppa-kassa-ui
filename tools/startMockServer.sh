#!/bin/bash
mockserver -p 8010 -m src/tests/mocksOrder/ &
mockserver -p 8011 -m src/tests/mocksPayment/ &
mockserver -p 8012 -m src/tests/mocksMerchant/ &