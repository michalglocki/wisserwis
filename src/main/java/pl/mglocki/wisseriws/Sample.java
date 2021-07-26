package pl.mglocki.wisseriws;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Sample {
	@Id
	private int id;

	private String title;
	private String picture;
	private String description;
	private String movie;
	private String belongs;
	
	public Sample() {}
	
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
	public String getBelongs() {
		return belongs;
	}
	public void setBelongs(String belongs) {
		this.belongs = belongs;
	}
	@Override
	public String toString() {
		return "Sample [id=" + id + ", title=" + title + ", picture=" + picture + ", description=" + description
				+ ", movie=" + movie + ", belongs=" + belongs + "]";
	}
	

	
}
