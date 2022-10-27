link chat: yourdomain/chat?mssv=any?box=any

example: http://example.com/chat?mssv=123-nguyenvana?box=1

---

- environment variables:

* PORT:
* DATABASE_URL: is db connection string
*
*
*
* NOTE: you must setup this variables when deploying the your domain

---

- changing url domain to listen event

* at src/view/index.html you must be changed domain in lines 325 and 328
* you must be replaced "http://localhost:5000/" to your domain
