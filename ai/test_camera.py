import cv2

camera = cv2.VideoCapture(0)

if not camera.isOpened():
    print("Camera not detected")
    exit()

while True:
    success, frame = camera.read()

    if not success:
        print("Failed to read camera")
        break

    cv2.imshow("AI Attendance Camera", frame)

    key = cv2.waitKey(1)

    if key == 27:
        break

camera.release()

cv2.destroyAllWindows()