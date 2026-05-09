import cv2
import os

student_name = input("Enter Student Name: ")

dataset_path = "dataset"

os.makedirs(dataset_path, exist_ok=True)

image_path = os.path.join(dataset_path, f"{student_name}.jpg")

# Duplicate check
if os.path.exists(image_path):
    print("Duplicate Entry Detected")
    exit()

face_classifier = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

camera = cv2.VideoCapture(0)

while True:
    success, frame = camera.read()

    if not success:
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = face_classifier.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=6,
        minSize=(100, 100)
    )

    for (x, y, w, h) in faces:

        # Add margin around face
        padding = 30

        x1 = max(x - padding, 0)
        y1 = max(y - padding, 0)

        x2 = min(x + w + padding, frame.shape[1])
        y2 = min(y + h + padding, frame.shape[0])

        # Draw rectangle
        cv2.rectangle(
            frame,
            (x1, y1),
            (x2, y2),
            (0, 255, 0),
            3
        )

        cv2.putText(
            frame,
            "Press S to Save",
            (10, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 0),
            2
        )

        key = cv2.waitKey(1)

        if key == ord("s"):

            face = frame[y1:y2, x1:x2]

            # Resize for consistency
            face = cv2.resize(face, (300, 300))

            cv2.imwrite(image_path, face)

            print("Face Saved Successfully")

            camera.release()

            cv2.destroyAllWindows()

            exit()

    cv2.imshow("Face Capture", frame)

    if cv2.waitKey(1) == 27:
        break

camera.release()

cv2.destroyAllWindows()