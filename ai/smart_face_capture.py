import cv2
import os
import face_recognition

student_name = input("Enter Student Name: ")

dataset_path = "dataset"

os.makedirs(dataset_path, exist_ok=True)

image_path = os.path.join(dataset_path, f"{student_name}.jpg")

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

        padding = 30

        x1 = max(x - padding, 0)
        y1 = max(y - padding, 0)

        x2 = min(x + w + padding, frame.shape[1])
        y2 = min(y + h + padding, frame.shape[0])

        cv2.rectangle(
            frame,
            (x1, y1),
            (x2, y2),
            (0, 255, 0),
            3
        )

        cv2.putText(
            frame,
            "Press S to Save Face",
            (10, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 0),
            2
        )

        key = cv2.waitKey(1)

        if key == ord("s"):

            new_face = frame[y1:y2, x1:x2]

            rgb_face = cv2.cvtColor(new_face, cv2.COLOR_BGR2RGB)

            encodings = face_recognition.face_encodings(rgb_face)

            if len(encodings) == 0:
                print("Face not detected properly")
                continue

            new_encoding = encodings[0]

            duplicate_found = False

            # Compare with existing dataset
            for file in os.listdir(dataset_path):

                existing_image_path = os.path.join(dataset_path, file)

                existing_image = face_recognition.load_image_file(
                    existing_image_path
                )

                existing_encodings = face_recognition.face_encodings(
                    existing_image
                )

                if len(existing_encodings) == 0:
                    continue

                existing_encoding = existing_encodings[0]

                results = face_recognition.compare_faces(
                    [existing_encoding],
                    new_encoding
                )

                if results[0]:
                    print("Duplicate Face Detected")

                    duplicate_found = True

                    break

            if duplicate_found:
                camera.release()

                cv2.destroyAllWindows()

                exit()

            face = cv2.resize(new_face, (300, 300))

            cv2.imwrite(image_path, face)

            print("Face Saved Successfully")

            camera.release()

            cv2.destroyAllWindows()

            exit()

    cv2.imshow("Smart Face Capture", frame)

    if cv2.waitKey(1) == 27:
        break

camera.release()

cv2.destroyAllWindows()