package main;
import javax.swing.JSlider;
import javax.swing.event.ChangeListener;

public class RangeSlider extends JSlider implements RangeSliderInterface
{

	private int minimum;
	private int maximum;
	
	public RangeSlider(int min, int max, int firstBound, int secondBound) {
		this.minimum = min;
		this.maximum = max;
		this.setFirstBound(firstBound);
		this.setSecondBound(secondBound);
	}
	
	public RangeSlider(int min, int max) {
		this.minimum = min;
		this.maximum = max;
		this.setFirstBound(min);
		this.setSecondBound(max);
	}
	
	@Override
	public int getMinimum() {
		return minimum;
	}

	@Override
	public int getMaximum() {
		return maximum;
	}

	@Override
	public int getFirstBound() {
		return getValue();
	}

	@Override
	public int getSecondBound() {
		return getMaximum()-getExtent();
	}

	@Override
	public int getExtent() {
		return super.getExtent();
	}

	@Override
	public void setExtent(int extent) {
		super.setExtent(extent);
	}

	@Override
	public void setMinimum(int min) {
		this.minimum = min;
	}

	@Override
	public void setMaximum(int max) {
		this.maximum = max;
	}

	@Override
	public void setFirstBound(int first) {
		super.setValue(first);
		
	}

	@Override
	public void setValue(int i)
	{
		super.setValue(i);
	}
	
	public int getValue()
	{
		return super.getValue();
	}
	
	@Override
	public void setSecondBound(int second) {
		super.setExtent(getMaximum()-second);
	}
	
	public void updateUI() {
		setUI(new RangeSliderUI(this));
		updateLabelUIs();
	}

}
