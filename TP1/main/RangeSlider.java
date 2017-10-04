package main;
import javax.swing.JSlider;
import javax.swing.event.ChangeListener;

public class RangeSlider extends JSlider implements RangeSliderInterface
{

	public RangeSlider(int min, int max, int firstBound, int secondBound) {
		super.setMaximum(max);
		super.setMinimum(min);
		this.setFirstBound(firstBound);
		this.setSecondBound(secondBound);
	}
	
	public RangeSlider(int min, int max) {
		super.setMaximum(max);
		super.setMinimum(min);
		this.setFirstBound(min);
		this.setSecondBound(max);
	}
	
	@Override
	public int getMinimum() {
		return super.getMinimum();
	}

	@Override
	public int getMaximum() {
		return super.getMaximum();
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
		super.setMinimum(min);
	}

	@Override
	public void setMaximum(int max) {
		super.setMaximum(max);
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
