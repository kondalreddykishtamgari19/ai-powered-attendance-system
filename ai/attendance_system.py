import cv2
import os
import csv
from datetime import datetime
import face_recognition

dataset_path = "dataset"

known_encodings = []
known_names = []

# Load known faces
for file in os.listdir(dataset_path):

    image_path = os.path.join(dataset_path, file)

    image = face_recognition.load_image_file(image_path)

    encodings = face_recognition.face_encodings(image)

    if len(encodings) > 0:
        known_encodings.append(encodings[0])

        name = os.path.splitext(file)[0]

        known_names.append(name)

print("Known Faces Loaded")

camera = cv2.VideoCapture(0)

marked_students = []

while True:
    success, frame = camera.read()

    if not success:
        break

    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    face_locations = face_recognition.face_locations(rgb_frame)

    face_encodings = face_recognition.face_encodings(
        rgb_frame,
        face_locations
    )

    for (top, right, bottom, left), face_encoding in zip(
        face_locations,
        face_encodings
    ):

        matches = face_recognition.compare_faces(
            known_encodings,
            face_encoding
        )

        name = "Unknown"

        if True in matches:

            match_index = matches.index(True)

            name = known_names[match_index]

            # Prevent duplicate attendance
            if name not in marked_students:

                marked_students.append(name)

                current_time = datetime.now().strftime(
                    "%H:%M:%S"
                )

                with open(
                    "attendance.csv",
                    "a",
                    newline=""
                ) as file:

                    writer = csv.writer(file)

                    writer.writerow([name, current_time])

                print(f"{name} Attendance Marked")

        cv2.rectangle(
            frame,
            (left, top),
            (right, bottom),
            (0, 255, 0),
            3
        )

        cv2.putText(
            frame,
            name,
            (left, top - 10),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 0),
            2
        )

    cv2.imshow("AI Attendance System", frame)

    if cv2.waitKey(1) == 27:
        break

camera.release()

cv2.destroyAllWindows()