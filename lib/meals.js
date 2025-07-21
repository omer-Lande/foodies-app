import { db, storage } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import slugify from "slugify";
import xss from "xss";

// Get all meals
export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const querySnapshot = await getDocs(collection(db, "meals"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Get a single meal by slug
export async function getMeal(slug) {
  // Find the meal with the matching slug
  const querySnapshot = await getDocs(collection(db, "meals"));
  const mealDoc = querySnapshot.docs.find((doc) => doc.data().slug === slug);
  return mealDoc ? { id: mealDoc.id, ...mealDoc.data() } : null;
}

// Save a new meal
export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  // Upload image to Firebase Storage
  // const extension = meal.image.name.split(".").pop();
  // const fileName = `${meal.slug}.${extension}`;
  // const storageRef = ref(storage, `meals/${fileName}`);
  // const bufferedImage = await meal.image.arrayBuffer();
  // await uploadBytes(storageRef, new Uint8Array(bufferedImage));
  // meal.image = await getDownloadURL(storageRef);

  if (meal.image instanceof File) {
    delete meal.image;
  }

  if (meal.creator_uid) {
    meal.creator_name = meal.creator_name;
    meal.creator_email = meal.creator_email;
  }

  // Save meal to Firestore
  await setDoc(doc(db, "meals", meal.slug), meal);
}

// Delete a meal by slug
export async function deleteMeal(slug) {
  // Get the meal to find the image URL
  const mealDoc = await getDoc(doc(db, "meals", slug));
  if (mealDoc.exists()) {
    const meal = mealDoc.data();
    // Delete the image from storage if it exists
    if (meal.image) {
      const imageRef = ref(storage, meal.image);
      try {
        await deleteObject(imageRef);
      } catch (e) {
        // Ignore if image doesn't exist
      }
    }
    // Delete the meal document
    await deleteDoc(doc(db, "meals", slug));
  }
}
