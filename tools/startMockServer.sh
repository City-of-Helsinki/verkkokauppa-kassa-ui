#!/bin/bash
mockserver -p 8000 -m src/tests/mocksOrder/ &
mockserver -p 8001 -m src/tests/mocksPayment/