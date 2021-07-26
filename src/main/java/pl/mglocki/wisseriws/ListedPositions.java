package pl.mglocki.wisseriws;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class ListedPositions {

		@Id
		private int id;

		private String title;
		private String picture;
		private String description;
		private String movie;
		private String button;
		private int belongs;
		
		public ListedPositions() {}
		
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getTitle() {
			return title;
		}
		public void setTitle(String title) {
			this.title = title;
		}
		public String getPicture() {
			return picture;
		}
		public void setPicture(String picture) {
			this.picture = picture;
		}
		public String getDescription() {
			return description;
		}
		public void setDescription(String description) {
			this.description = description;
		}
		public String getMovie() {
			return movie;
		}
		public void setMovie(String movie) {
			this.movie = movie;
		}
		public String getButton() {
			return button;
		}
		public void setButton(String button) {
			this.button = button;
		}
		
		public int getBelongs() {
			return belongs;
		}
		public void setBelongs(int belongs) {
			this.belongs = belongs;
		}
		@Override
		public String toString() {
			return "ListedPositions [id=" + id + ", title=" + title + ", picture=" + picture + ", description="
					+ description + ", movie=" + movie + ", button=" + button + "]";
		}
		
		
}
