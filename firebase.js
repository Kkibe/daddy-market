import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC6naHphemz813TZnXuPClKMROleuDPxIw",
  authDomain: "mynutrition-72ada.firebaseapp.com",
  projectId: "mynutrition-72ada",
  storageBucket: "mynutrition-72ada.appspot.com",
  messagingSenderId: "1029593263014",
  appId: "1:1029593263014:web:4348ce8a6dfce7919dfd67",
  measurementId: "G-ZCENKRJEGB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

// Auth Service
export const authService = {
  async createUser(email, password, userData = {}) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile if name is provided
      if (userData.name) {
        await updateProfile(user, { displayName: userData.name });
      }

      // Create user document in Firestore
      await userService.setUser(user.uid, {
        name: userData.name || '',
        email: user.email,
        photoURL: userData.photoURL || '',
        isPremium: false,
        createdAt: new Date().toISOString()
      });

      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async signInUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user exists in Firestore, if not create
      const userDoc = await userService.getUser(user.uid);
      if (!userDoc) {
        await userService.setUser(user.uid, {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL || '',
          isPremium: false,
          createdAt: new Date().toISOString()
        });
      }

      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async signOutUser() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
  }
};

// User Service
export const userService = {
  async getUser(uid) {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  },

  async setUser(uid, userData) {
    try {
      await setDoc(doc(db, "users", uid), userData, { merge: true });
      return true;
    } catch (error) {
      console.error("Error setting user:", error);
      return false;
    }
  },

  async updateUser(uid, updates) {
    try {
      await updateDoc(doc(db, "users", uid), updates);
      return true;
    } catch (error) {
      console.error("Error updating user:", error);
      return false;
    }
  },

  async deleteUser(uid) {
    try {
      await deleteDoc(doc(db, "users", uid));
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      return false;
    }
  }
};

// Product Service
export const productService = {
  async getProducts() {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting products:", error);
      return [];
    }
  },

  async getProduct(productId) {
    try {
      const docRef = doc(db, "products", productId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    } catch (error) {
      console.error("Error getting product:", error);
      return null;
    }
  },

  async getFeaturedProducts(limitCount = 4) {
    try {
      const q = query(
        collection(db, "products"),
        where("isFeatured", "==", true),
        limit(limitCount)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting featured products:", error);
      return [];
    }
  },

  async getProductsByCategory(category) {
    try {
      const q = query(
        collection(db, "products"),
        where("category", "==", category)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting products by category:", error);
      return [];
    }
  }
};

// Order Service
export const orderService = {
  async createOrder(orderData) {
    try {
      const orderRef = doc(collection(db, "orders"));
      await setDoc(orderRef, {
        ...orderData,
        createdAt: new Date().toISOString(),
        status: "pending"
      });
      return { success: true, orderId: orderRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getOrder(orderId) {
    try {
      const docRef = doc(db, "orders", orderId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    } catch (error) {
      console.error("Error getting order:", error);
      return null;
    }
  },

  async getUserOrders(userId) {
    try {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting user orders:", error);
      return [];
    }
  },

  async updateOrder(orderId, updates) {
    try {
      await updateDoc(doc(db, "orders", orderId), updates);
      return true;
    } catch (error) {
      console.error("Error updating order:", error);
      return false;
    }
  },

  async deleteOrder(orderId) {
    try {
      await deleteDoc(doc(db, "orders", orderId));
      return true;
    } catch (error) {
      console.error("Error deleting order:", error);
      return false;
    }
  }
};

// Storage Service
export const storageService = {
  async uploadFile(file, path) {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return { success: true, url: downloadURL };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async deleteFile(url) {
    try {
      const fileRef = ref(storage, url);
      await deleteObject(fileRef);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Contact Service
export const contactService = {
  async addContact(data) {
    try {
      const contactRef = doc(collection(db, "contacts"));
      await setDoc(contactRef, {
        ...data,
        createdAt: new Date().toISOString(),
        status: "new"
      });
      return { success: true, contactId: contactRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};